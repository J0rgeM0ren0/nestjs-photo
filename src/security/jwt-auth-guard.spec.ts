import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('JwtAuthGuard', () => {
    let guard: JwtAuthGuard;
    let jwtService: JwtService;

    beforeEach(() => {
        jwtService = {
            verify: jest.fn(),
        } as any;

        guard = new JwtAuthGuard(jwtService);
    });

    const mockContext = (headers: Record<string, string>) => ({
        switchToHttp: () => ({
            getRequest: () => ({
                headers,
            }),
        }),
    }) as unknown as ExecutionContext;

    it('should return true if token is valid', () => {
        const userMock = { id: 'user1' };
        (jwtService.verify as jest.Mock).mockReturnValue(userMock);

        const context = mockContext({
            authorization: 'Bearer valid.token.here',
        });

        const result = guard.canActivate(context);
        expect(result).toBe(true);
    });

    it('should throw if Authorization header is missing', () => {
        const context = mockContext({});

        expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
        expect(() => guard.canActivate(context)).toThrow('Falta authorization');
    });

    it('should throw if token is missing after Bearer', () => {
        const context = mockContext({
            authorization: 'Bearer ',
        });

        expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
        expect(() => guard.canActivate(context)).toThrow('Falta token');
    });

    it('should throw if token is invalid or expired', () => {
        (jwtService.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Token inválido');
        });

        const context = mockContext({
            authorization: 'Bearer invalid.token.here',
        });

        expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
        expect(() => guard.canActivate(context)).toThrow('Token invalido o expiro');
    });
});